import dayjs from 'dayjs'

export const formatDate = (time: string) => {
  const adTime = dayjs(time).format('YYYY/MM/DD')
  const twTime = `${Number(adTime.split('/')[0]) - 1911}/${
    adTime.split('/')[1]
  }/${adTime.split('/')[2]}`
  return twTime
}
