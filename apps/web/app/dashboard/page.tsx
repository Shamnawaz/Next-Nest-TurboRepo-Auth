import { getSession } from '@/lib/session'
import { Role } from '@/lib/type'
import { redirect } from 'next/navigation'
import React from 'react'

const DashBoard = async () => {

    const session = await getSession()
    if(!session || !session.user) redirect('/auth/signin')
        if(session.user.role !== Role.ADMIN) redirect('/')

    return (
        <div>
            
        </div>
    )
}

export default DashBoard
