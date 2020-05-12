import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { getAll } from '../BooksAPI'
import Shelf from '../components/Shelf'

class Home extends Component {
	state = {
		Books: [],
		currentlyReading: [],
		wantToRead: [],
		read: [],
	}

	async componentDidMount() {
		try {
			const books = await getAll()
			this.setState(() => ({
				Books: books,
			}))

			books.forEach(book => {
				if (book.shelf === 'currentlyReading') {
					this.setState(prevState => ({
						currentlyReading: [...prevState.currentlyReading, book],
					}))
				} else if (book.shelf === 'wantToRead') {
					this.setState(prevState => ({
						wantToRead: [...prevState.wantToRead, book],
					}))
				} else if (book.shelf === 'read') {
					this.setState(prevState => ({
						read: [...prevState.read, book],
					}))
				}
			})
			console.log(this.state)
		} catch (error) {
			console.log(error)
		}
	}

	render() {
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
								books={this.state.currentlyReading}
							/>
							<Shelf title='Want To Read' />
							<Shelf title='Read' />
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
