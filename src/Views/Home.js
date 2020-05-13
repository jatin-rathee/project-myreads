import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { getAll } from '../BooksAPI'
import Shelf from '../components/Shelf'

class Home extends Component {
	state = {
		books: [],
	}

	async componentDidMount() {
		const books = await getAll()
		this.setState(() => ({
			books: books,
		}))
	}

	updateView = async () => {
		const books = await getAll()
		this.setState(() => ({
			books: books,
		}))
	}

	render() {
		const { books } = this.state
		return (
			<div>
				<div className='list-books'>
					<div className='list-books-title'>
						<h1>MyReads</h1>
					</div>
					<div className='list-books-content'>
						<div>
							<Shelf
								title='Currently Reading'
								books={books.filter(
									book => book.shelf === 'currentlyReading'
								)}
								shelf='currentlyReading'
								updateView={this.updateView}
							/>
							<Shelf
								title='Want To Read'
								books={books.filter(
									book => book.shelf === 'wantToRead'
								)}
								shelf='wantToRead'
								updateView={this.updateView}
							/>
							<Shelf
								title='Read'
								books={books.filter(
									book => book.shelf === 'read'
								)}
								shelf='read'
								updateView={this.updateView}
							/>
						</div>
					</div>
					<div className='open-search'>
						<Link to='/search'>Add a book</Link>
					</div>
				</div>
			</div>
		)
	}
}

export default Home
