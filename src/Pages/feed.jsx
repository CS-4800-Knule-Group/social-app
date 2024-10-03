import React from 'react'
import './Feed.css'

const Feed = () => {
return (
	<div>
		<div className='feed'>
			<div className='post'>
				<div className='poster'>
					<img className='profilePicture' src='/kirb.jpg' height={100} width={100} />
					<div className='textInfo'>
						<h1 className='username'>Kirby Watterson</h1>
						<p className='postTime'>August 13, 2024</p>
					</div>
				</div>
				<p>This is the post that I, kirby, am making</p>
			</div>
		</div>
	</div>
)
}

export default Feed