import PersonalRoom from '@/components/PersonalRoom'
import { Metadata } from 'next'

export const metadata:Metadata={
  title:"Personal Room | Anas Zoom"
}

const page = () => {
  return (
    <PersonalRoom />
  )
}

export default page
