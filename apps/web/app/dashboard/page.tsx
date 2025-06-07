import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import React from 'react'

const DashBoard = async () => {

    const session = await getSession()
    if(!session || !session.user) redirect('/auth/signin')

    return (
        <div>
            
        </div>
    )
}

export default DashBoard
