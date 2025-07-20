import { Component,OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AdminService } from '../../../services/admin.service';
@Component({
  selector: 'app-dash-nav',
  templateUrl: './dash-nav.component.html',
  styleUrl: './dash-nav.component.css'
})
export class DashNavComponent {
  calendarEvents = [
    { title: 'Sample Event', date: '2025-07-20' },
    { title: 'Meeting', date: '2025-07-25' }
  ];
constructor(private user:AdminService){}
processingUser = false
stats_info:any
basicStats:any
basicOptions:any
stats_overall:any[] = []
data_stats:any
options:any
userData:any

ngOnInit(){
this.processingUser = true

const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--text-color');
const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

this.user.fetchStats().then((data:any)=>{
this.stats_info = data.overall_stats
this.userData = data.user
this.stats_overall = data.stats
this.basicStats=  {
  labels: ['Packages', "Hotels", 'Destinations', 'Blogs',"Rooms"],
  datasets: [
      {
          label: 'Overall Stats',
          data: [this.stats_info['packages'], this.stats_info['hotels'], this.stats_info['destinations'], this.stats_info['blog'],this.stats_info['rooms']],
          backgroundColor: ['#3B82F6', '#EF4444', ' #F59E0B', '#7cfc00',"#a855f7"],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
      }
  ]
};


this.basicOptions = {
  plugins: {
      legend: {
          labels: {
              color: textColor
          }
      }
  },
  scales: {
      y: {
          beginAtZero: true,
          ticks: {
              color: textColorSecondary
          },
          grid: {
              color: surfaceBorder,
              drawBorder: false
          }
      },
      x: {
          ticks: {
              color: textColorSecondary
          },
          grid: {
              color: surfaceBorder,
              drawBorder: false
          }
      }
  }
};




this.data_stats = {
  labels: this.stats_overall.map((stat:any)=>stat.month),
  datasets: [
      {
          label: 'Packages',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: this.stats_overall.map((stat:any)=>stat.packages)
      },
      {
          label: 'Destinations',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: this.stats_overall.map(stat=>stat.destination)
      },
       {
          label: 'Hotels',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          borderColor: documentStyle.getPropertyValue('--green-500'),
          data: this.stats_overall.map(stat=>stat.hotels)
      },
      {
        label: 'Blogs',
        backgroundColor: documentStyle.getPropertyValue('--purple-500'),
        borderColor: documentStyle.getPropertyValue('--purple-500'),
        data: this.stats_overall.map(stat=>stat.blogs)
    }
  ]
};



this.options = {
  maintainAspectRatio: false,
  aspectRatio: 0.8,
  plugins: {
      legend: {
          labels: {
              color: textColor
          }
      }
  },
  scales: {
      x: {
          ticks: {
              color: textColorSecondary,
              font: {
                  weight: 500
              }
          },
          grid: {
              color: surfaceBorder,
              drawBorder: false
          }
      },
      y: {
          ticks: {
              color: textColorSecondary
          },
          grid: {
              color: surfaceBorder,
              drawBorder: false
          }
      }

  }
};
this.processingUser = false
}).catch((err)=>console.error(err))
}

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth', 
    plugins: [dayGridPlugin, interactionPlugin], 
    events: this.calendarEvents, 
    dateClick: this.handleDateClick.bind(this), 
    eventClick: this.handleEventClick.bind(this) 
  };


  handleDateClick(arg: any) {
    console.log(arg)
    const title = prompt('Enter event title:'); 
    if (title) {
   
      const newEvent = { title, date: arg.dateStr };

      this.calendarEvents = [...this.calendarEvents, newEvent];
      
      this.calendarOptions = {
        ...this.calendarOptions,
        events: this.calendarEvents
      };
    }
  }

  handleEventClick(arg: any) {
    if (confirm(`Do you want to delete the event '${arg.event.title}'?`)) {
     
      this.calendarEvents = this.calendarEvents.filter(
        event => event.title !== arg.event.title || event.date !== arg.event.startStr
      );
 
      this.calendarOptions = {
        ...this.calendarOptions,
        events: this.calendarEvents
      };
    }
  }
}
