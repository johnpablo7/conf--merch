import React, { useRef, useContext } from 'react';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import { Link } from 'react-router-dom';
import { GMAPS_API_KEY } from '../constants/keys';
import AppContext from '../context/AppContext';
import '../styles/components/Information.css';

const Information = ({ history }) => {
	const { state, addToBuyer } = useContext(AppContext);
	const form = useRef(null);
	const { cart } = state;

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(form.current);
		const buyer = {
			name: formData.get('name'),
			email: formData.get('email'),
			address: formData.get('address'),
			apto: formData.get('apto'),
			city: formData.get('city'),
			country: formData.get('country'),
			state: formData.get('state'),
			cp: formData.get('cp'),
			phone: formData.get('phone')
		};
		addToBuyer(buyer);
		history.push('/checkout/payment');
	};

	return (
		<div className="Information">
			<div className="Information-content">
				<div className="Information-head">
					<h2>Información de Contacto</h2>
				</div>
				<div className="Information-form">
					<form ref={form} onSubmit={handleSubmit}>
						<input
							type="text"
							placeholder="Nombre Completo"
							name="name"
							required
						/>
						<input
							type="text"
							placeholder="Correo Electronico"
							name="email"
							required
						/>
						<ReactGoogleAutocomplete
							apiKey={GMAPS_API_KEY}
							onPlaceSelected={(place) => {
								const formData = new FormData(form.current);
								console.log(formData.get('address'));
							}}
							options={{
								types: [ 'address' ],
								componentRestrictions: { country: 'pe' }
							}}
							placeholder="Dirección"
							name="address"
							required
						/>
						<input
							type="text"
							placeholder="apto"
							name="apto"
							required
						/>
						<input
							type="text"
							placeholder="Ciudad"
							name="city"
							required
						/>
						<input
							type="text"
							placeholder="Pais"
							name="country"
							required
						/>
						<input
							type="text"
							placeholder="Estado"
							name="state"
							required
						/>
						<input
							type="text"
							placeholder="Código Postal"
							name="cp"
							required
						/>
						<input
							type="text"
							placeholder="Teléfono"
							name="phone"
							required
						/>
						<div className="Information-buttons">
							<div className="Information-back">
								<Link to="/checkout">Regresar</Link>
							</div>
							<div className="Information-next">
								<button type="submit">Pagar</button>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div className="Information-sidebar">
				<h3>Pedido:</h3>
				{cart.map((item) => (
					<div className="Information-item" key={item.title}>
						<div className="Information-element">
							<h4>{item.title}</h4>
							<span>${item.price}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Information;
