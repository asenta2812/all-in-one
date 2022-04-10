import moment from 'moment'

export const getFullLinkImage = (url) => {
  if (!url) {
    return 'https://picsum.photos/50'
  }

  return `${import.meta.env.VITE_UPLOAD_URL}${url}`
}

export const getNameAndAvatarRoom = (room, currentUserId) => {
  let name = ''
  let avatar = ''
  if (!room) {
    return { name, avatar }
  }
  if (room.name) {
    name = room.name
  }
  if (room.avatar) {
    avatar = getFullLinkImage(room.avatar)
  }

  if (room.participants.length > 2) {
    name = room.participants.map((item) => item.nickname).join(', ')
    avatar = getFullLinkImage()
  } else {
    const participant = room.participants.find(
      (item) => item.user !== currentUserId
    )
    name = participant.nickname
    avatar = getFullLinkImage(participant.avatar)
  }

  return { name, avatar }
}
export const formatDateTimeRecent = (dateStr) => {
  const timediff = moment(dateStr).diff(new Date())
  const diffDate = new Date(Math.abs(timediff)).getDate()
  if (diffDate === 1) {
    return moment(dateStr).format('HH:mm')
  }
  if (diffDate === 2) {
    return 'Yesterday'
  }

  return moment(dateStr).format('DD/MM/YY')
}

export const getIsNewMessage = ({ seen_by: seenBy, sender }, currentUserId) => {
  // is new if not sender is me and seendBy not have me
  return sender !== currentUserId && !seenBy?.includes(currentUserId)
}
