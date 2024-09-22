import { useAuth } from '@/context/AuthContext'
import LoginForm from '@/utils/LandingPageModel'
import { MailOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useState } from 'react'

function Mail({ email }) {
  const [log, setLog] = useState(false)
  const { user } = useAuth()
  return (
    <>
      <Button type='primary' onClick={user ? null : () => setLog(true)} className=' w-full ' href={user ? `mailto:${email}` : null} size='large' style={{ fontWeight: 'bold', fontFamily: 'serif', background: 'green' }} icon={<MailOutlined />} >Email</Button>
      <LoginForm visible={log} onClose={() => setLog(false)} />
    </>
  )
}
export default Mail
