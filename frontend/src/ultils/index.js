import moment from 'moment'

/**
 * It returns a URL to an image, either the one provided or a placeholder
 * @param url - The URL of the image you want to display.
 * @returns A function that takes in a url and returns a string.
 */
export const getFullLinkImage = (url) => {
  if (!url) {
    return 'https://picsum.photos/50'
  }

  return `${process.env.REACT_APP_UPLOAD_URL}${url}`
}

/**
 * It returns an object with the name and avatar of a room
 * @param room - the room object
 * @param currentUserId - The current user's ID.
 */
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
/**
 * It returns the time if the date is today, 'Yesterday' if the date is yesterday, and the date if the
 * date is more than 2 days ago
 * @param dateStr - The date string to be formatted.
 * @returns A string
 */
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

/**
 * Is new if not sender is me and seendBy not have me
 * @param currentUserId - The id of the current user.
 */
export const getIsNewMessage = ({ seen_by: seenBy, sender }, currentUserId) => {
  // is new if not sender is me and seendBy not have me
  return sender !== currentUserId && !seenBy?.includes(currentUserId)
}

export const convertToEmoji = (code) => `&#${code};`
