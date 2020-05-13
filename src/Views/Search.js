import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { search } from '../BooksAPI'
import Book from '../components/Book'

class Search extends Component {
	state = {
		query: '',
		currBooks: [],
	}

	fetchBooks = async query => {
		try {
			const currBooks = await search(query)

			currBooks
				? this.setState({ currBooks })
				: this.setState({ currBooks: [] })
		} catch (error) {
			console.log(error)
		}
	}

	handleChange = query => {
		this.setState(() => ({
			query: query,
		}))

		this.fetchBooks(query)
	}

	updateView = () => {}

	render() {
		const result = this.state.currBooks
		return (
			<div>
				<div className='search-books'>
					<div className='search-books-bar'>
						<Link className='close-search' to='/'>
							Close
						</Link>
						<div className='search-books-input-wrapper'>
							<input
								type='text'
								placeholder='Search by title or author'
								value={this.state.query}
								onChange={e =>
									this.handleChange(e.target.value)
								}
							/>
						</div>
					</div>

					<div className='search-books-results'>
						<ol className='books-grid'>
							{result.length > 0
								? result.map(book => (
										<Book
											id={book.id}
											key={book.id}
											thumbnail={
												book.imageLinks.thumbnail
											}
											title={book.title}
											authors={book.authors}
											shelf='none'
											updateView={this.updateView}
										/>
								  ))
								: ''}
						</ol>
					</div>
				</div>
			</div>
		)
	}
}

export default Search
