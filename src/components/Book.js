import PropTypes from 'prop-types'
import React from 'react'
import { update } from '../BooksAPI'

class Book extends React.Component {
	state = {
		value: 'read',
	}

	componentDidMount() {
		this.setState(() => ({
			value: this.props.shelf,
		}))
	}

	handleSelect = e => {
		const changeTo = e.target.value
		this.setState(() => ({
			value: changeTo,
		}))
		update({ id: this.props.id }, e.target.value).then(res =>
			this.props.updateView()
		)
	}

	render() {
		const { thumbnail, title, authors } = this.props
		return (
			<div>
				<li>
					<div className='book'>
						<div className='book-top'>
							<div
								className='book-cover'
								style={{
									width: 128,
									height: 193,
									backgroundImage: `url(${thumbnail})`,
								}}
							/>
							<div className='book-shelf-changer'>
								<select
									value={this.state.value}
									onChange={e => this.handleSelect(e)}
								>
									<option value='move' disabled>
										Move to...
									</option>
									<option value='currentlyReading'>
										Currently Reading
									</option>
									<option value='wantToRead'>
										Want to Read
									</option>
									<option value='read'>Read</option>
									<option value='none'>None</option>
								</select>
							</div>
						</div>
						<div className='book-title'>{title}</div>
						{authors
							? authors.map(author => (
									<div className='book-authors' key={author}>
										{author}
									</div>
							  ))
							: ''}
					</div>
				</li>
			</div>
		)
	}
}

Book.propTypes = {
	authors: PropTypes.array,
	thumbnail: PropTypes.any.isRequired,
	title: PropTypes.string.isRequired,
}

export default Book
