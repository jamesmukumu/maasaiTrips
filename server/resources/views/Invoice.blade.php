<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Invoice</title>

		<style>
            .stamp {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) rotate(-20deg);
	width: 300px;
	height: 300px;
	border: 6px solid rgba(0, 0, 0, 0.2);
	border-radius: 50%;
	color: rgba(0, 0, 0, 0.2);
	font-size: 22px;
	font-weight: bold;
	text-align: center;
	line-height: 300px;
	font-family: 'Arial Black', sans-serif;
	letter-spacing: 2px;
	pointer-events: none;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

			.invoice-box {
				max-width: 800px;
				margin: auto;
				padding: 30px;
				border: 1px solid #eee;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
				font-size: 16px;
				line-height: 24px;
				font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
				color: #555;
			}

			.invoice-box table {
				width: 100%;
				line-height: inherit;
				text-align: left;
			}

			.invoice-box table td {
				padding: 5px;
				vertical-align: top;
			}

			.invoice-box table tr td:nth-child(2) {
				text-align: right;
			}

			.invoice-box table tr.top table td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.top table td.title {
				font-size: 45px;
				line-height: 45px;
				color: #333;
			}

			.invoice-box table tr.information table td {
				padding-bottom: 40px;
			}

			.invoice-box table tr.heading td {
				background: #eee;
				border-bottom: 1px solid #ddd;
				font-weight: bold;
			}

			.invoice-box table tr.details td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.item td {
				border-bottom: 1px solid #eee;
			}

			.invoice-box table tr.item.last td {
				border-bottom: none;
			}

			.invoice-box table tr.total td:nth-child(2) {
				border-top: 2px solid #eee;
				font-weight: bold;
			}

			@media only screen and (max-width: 600px) {
				.invoice-box table tr.top table td {
					width: 100%;
					display: block;
					text-align: center;
				}

				.invoice-box table tr.information table td {
					width: 100%;
					display: block;
					text-align: center;
				}
			}

			/** RTL **/
			.invoice-box.rtl {
				direction: rtl;
				font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
			}

			.invoice-box.rtl table {
				text-align: right;
			}

			.invoice-box.rtl table tr td:nth-child(2) {
				text-align: left;
			}
		</style>
	</head>

	<body>
        <span class="stamp is-approved">Approved</span>
		<div class="invoice-box">
			<table cellpadding="0" cellspacing="0">
				<tr class="top">
					<td colspan="2">
						<table>
							<tr>
								

								<td>
@php
$stamp =date('l, F j, Y H:i:s');

@endphp

									Invoice #:{{random_int(100,3333)}} <br />
									Created: {{$stamp}}<br />
								
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="information">
					<td colspan="2">
						<table>
							<tr>
								<td>
									Kenlands Nakuru.<br />
									Postal Code 11,003<br />
								
								</td>

								<td>
									<br />
									{{$payload["firstName"]}} {{$payload['lastName']}}<br />
									{{$payload['email']}}
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="heading">
					<td>Payment Method</td>

					<td>MPESA </td>
				</tr>

				<tr class="details">
					<td>MPESA</td>

					<td>{{$payload['amountPaid']}}</td>
				</tr>

				<tr class="heading">
					<td>Item</td>

					<td>Price</td>
				</tr>

				<tr class="item">
					<td>{{$packages['packageTitle']}}</td>

					<td>${{$payload['amountPaid']}}.00</td>
				</tr>

				

				

				<tr class="total">
					<td></td>

					<td>Total: ${{$payload['amountPaid']}}.00</td>
				</tr>
			</table>
		</div>
       

	</body>
</html>