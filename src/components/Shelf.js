import PropTypes from 'prop-types'
import React from 'react'
import Book from './Book'

const Shelf = props => {
	const books = props.books
	return (
		<div>
			<div className='bookshelf'>
				<h2 className='bookshelf-title'>{props.title}</h2>
				<div className='bookshelf-books'>
					<ol className='books-grid'>
						{books
							? books.map(
									({ id, imageLinks, title, authors }) => (
										<Book
											id={id}
											key={id}
											thumbnail={imageLinks.thumbnail}
											title={title}
											authors={authors}
											shelf={props.shelf}
											updateView={props.updateView}
										/>
									)
							  )
							: 'Loading....'}
					</ol>
				</div>
			</div>
		</div>
	)
}

Shelf.propTypes = {
	books: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired,
}

export default Shelf
