import React, { Component } from 'react';
import { CategoryService } from '../services';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export default class Categories extends Component {
  state = { categories: null, isLoading: null };
  componentWillMount() {
    this.getAllCategories();
  }
  async getAllCategories() {
    this.setState({ isLoading: true });
    try {
      let response = await CategoryService.getAllCategories();
      if (response && response.status === 200) {
        let data = response.data;

        this.setState({
          categories: data,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async createCategory(categoryName) {
    try {
      const userId = this.props.user.uid;

      let response = await CategoryService.createCategory(userId, categoryName);
      if (response && response.status === 200) {
        let data = response.data;

        this.setState({
          categories: data,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async deleteCategory(id) {
    try {
      let response = await CategoryService.deleteCategory(id);
      if (response && response.status === 200) {
        let data = response.data;

        console.log('Category deleted', data);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { categories, isLoading } = this.state;
    return (
      <div style={{ margin: 24 }}>
        <h2>My Categories</h2>
        {isLoading ? (
          'Loading...'
        ) : (
          <ul>
            {categories &&
              categories.map(category => {
                return (
                  <li>
                    <h3>
                      {category.categoryName}{' '}
                      <Button
                        onClick={this.deleteCategory.bind(this, category.id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </h3>
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    );
  }
}
