import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { NavLinks } from '@/constants/constants'
import AuthProviders from './AuthProviders'
import { getCurrentUser } from '@/lib/session'

const Navbar = async () => {
	const session = await getCurrentUser(); // can swap {} to null to show AuthProviders
	
	return (
		<nav className='flexBetween navbar'>
			<div className='flex-1 flexStart gap-10'>
				<Link href="/">
					<Image 
						src="/logo.png" 
						width={200} 
						height={50} 
						alt="Fatin Iftekhar portfolio logo"
					/>
				</Link>
				<ul className='xl:flex hidden text-sm gap-7'>
					{ NavLinks.map((link) => (
					<Link href={link.href} key={link.key}>
						{link.text}
					</Link>
					)) }
				</ul>
			</div>

			<div className='flexCenter gap-4'>
				{session?.user ? (
					<>
						{session?.user?.image && 
							(<Image 
								src={session.user.image}
								width={40}
								height={40}
								className='rounded-full'
								alt={session.user.name}
							/>)
						}
				
						<Link href="/create-project">
						Share Work
						</Link>
					</>
				) : (
					<AuthProviders />
				)
				}
			</div>
		</nav>
	)
}

export default Navbar