export type Song = {
  no: number
  title: string
  length: string
}

export function getListData() {
  const data: Song[] = [
    { no: 3, title: 'Wonderwall', length: '4:18' },
    { no: 4, title: "Don't Look Back in Anger", length: '4:48' },
    { no: 12, title: 'Champagne Supernova', length: '7:27' },
    { no: 13, title: 'Wonderwall', length: '4:18' },
    { no: 41, title: "Don't Look Back in Anger", length: '4:48' },
    { no: 121, title: 'Champagne Supernova', length: '7:27' }
  ]
  return new Promise((resolve, reject) => {
    // 1s 后返回数据
    setTimeout(() => {
      resolve(data)
    }, 1500)
  })
}
