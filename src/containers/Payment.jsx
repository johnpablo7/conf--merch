import React, { useContext } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import AppContext from '../context/AppContext';
import '../styles/components/Payment.css';

const Payment = ({ history }) => {
	const { state, addNewOrder, removeAllFromCart } = useContext(AppContext);
	const { cart, buyer } = state;

	const paypalOptions = {
		clientId:
			'AZEmSoi-7U1mossKT3z1QPUSm8Heor15P_IAqdvZHT13JCzgkm2qkfLbqTDug6dIBxfR5yoNCyvC86q-',
		intent: 'capture',
		currency: 'USD'
	};

	const buttonStyles = {
		layout: 'vertical',
		shape: 'react'
	};

	const handlePaymentSuccess = (data) => {
		if (data.status === 'COMPLETED') {
			const newOrder = {
				buyer,
				product: cart,
				payment: data
			};
			addNewOrder(newOrder);
			removeAllFromCart();
			history.push('/checkout/success');
		}
	};

	const handleSumTotal = () => {
		const reducer = (accumulator, currentValue) =>
			accumulator + currentValue.price;
		const sum = cart.reduce(reducer, 0);
		return sum;
	};

	return (
		<div className="Payment">
			<div className="Payment-content">
				<h3>Resumen del Pedido:</h3>
				{cart.map((item) => (
					<div className="Payment-item" key={item.title}>
						<div className="Payment-element">
							<h4>{item.title}</h4>
							<span>
								$ {''}
								{item.price}
							</span>
						</div>
					</div>
				))}
				<div className="Payment-button">
					<PayPalButton
						paypalOptions={paypalOptions}
						buttonStyles={buttonStyles}
						amount={handleSumTotal()}
						// onPaymentStart={() => console.log('Start Payment')}
						onSuccess={(data) => handlePaymentSuccess(data)}
						onError={(error) => console.log(error)}
						onCancel={(data) => console.log(data)}
					/>
				</div>
			</div>
			<div />
		</div>
	);
};

export default Payment;
