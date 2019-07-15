import React, { Component } from 'react';
import { CategoryGifsService } from '../services';
import GifGrid from '../components/GifGrid';
import { Link } from 'react-router-dom';

export default class CategoryDetails extends Component {
  state = { gifs: null, category: null };

  componentWillMount() {
    this.getCategoryGifs();
  }

  async getCategoryGifs() {
    let match = this.props.match;
    let id = match && match.params && match.params.id;
    try {
      let response = await CategoryGifsService.getCategoryGifs(id);
      if (response && response.status === 200) {
        let data = response.data;

        this.setState({
          category: data.category,
          gifs: data.gifs,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    let { gifs, category } = this.state;
    return (
      <div>
        <h3>{category && category.categoryName + ' GIFs'}</h3>
        {gifs && gifs.length && gifs.length >= 1 ? (
          <GifGrid gifs={gifs} isCategoryDetails={true} />
        ) : (
          <Link to="/">
            <h5>Add more GIFs to this category!</h5>
          </Link>
        )}
      </div>
    );
  }
}
