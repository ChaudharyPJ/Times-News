import React, { Component } from 'react'
import NewsItems from './NewsItems'
import { Spinner } from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaaultProps={
        country:'in',
        pageSize:8,
        category:'general'
    }

    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    }

    constructor() {
        super();
        
        this.state = {
            articles: [],
            loading: true,
            page: 1
            
        }
    }

    async componentDidMount() {    
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8f1cff3caab24934974d588deeeec85d&page1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});

        let data = await fetch(url);  
        let parseData = await data.json()
        console.log(parseData)
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults,loading:false })

    }

    handlePrevClick = async () => {
        
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8f1cff3caab24934974d588deeeec85d&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);  
        let parseData = await data.json()
        console.log(parseData)
        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading:false
        })

    }
    handleNextClick = async () => {
      
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

        }
       
            
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8f1cff3caab24934974d588deeeec85d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parseData = await data.json()
            
            this.setState({
                page: this.state.page + 1,
                articles: parseData.articles,
                loading:false
            })
        
    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center' style={{margin:'40px 0px'}}>Times News- Top Headlines</h1>
               {this.state.loading && this.state.loading&&<Spinner/>}
                <div className='row '>
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4 " key={element.url}>
                            
                            <NewsItems title={element ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage}
                                newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default News


