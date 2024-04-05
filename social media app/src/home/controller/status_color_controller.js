function handleStatusColor(userStatus) {
    switch (userStatus) {
      case 'Available':
        return 'bg-green-500'

      case 'Busy':
        return 'bg-yellow-500'

      case 'Offline':
        return 'bg-red-500'



      default:
        break;
    }


  }

  export default handleStatusColor;