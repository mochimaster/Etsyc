import React from 'react'

class SortDropDownList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sortParamOrder: 'newest'
    }

    this.handleSortChange = this.handleSortChange.bind(this)
  }

  handleSortChange(e) {
    const sortValue = e.target.value

    this.setState(
      {
        sortParamOrder: sortValue
      },
      () => this.props.setSort(sortValue)
    )
  }

  render() {
    return (
      <div>
        <label for="sortParamOrder">Sort by: </label>

        <select
          id="sortParamOrder"
          value={this.state.sortParamOrder}
          onChange={this.handleSortChange}
        >
          <option value="priceAsc">Lowest Price</option>
          <option value="priceDesc">Highest Price</option>
          <option value="newest">Most Recent</option>
        </select>
      </div>
    )
  }
}

export default SortDropDownList
