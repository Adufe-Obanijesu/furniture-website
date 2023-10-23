const Order = ({ name, email, phoneNumber, cart, amount }) => {

	return (
		<tr className="hover:bg-gray-100">
      <td className="py-4 px-6 text-gray-700 capitalize">{name}</td>
      <td className="py-4 px-6 text-gray-700 capitalize">{email}</td>
      <td className="py-4 px-6 text-gray-700 capitalize">{phoneNumber}</td>
      <td className="py-4 px-6 text-gray-700 capitalize">
        {
          cart.map(cart => <span key={cart.name}>{cart.name}, </span>)
        }
      </td>
      <td className="py-4 px-6 text-sm font-medium text-gray-700 whitespace-nowrap">${amount}</td>
	  </tr>
	)
}

export default Order;