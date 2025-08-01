import React, { useState } from 'react'
import News from './Components/News'
import Blogs from './Components/Blogs'

const App = () => {
  const [showNews, setShowNews]=useState(true)
  const [showBlogs, setShowBlogs]=useState(false)
  const [blogs, setBlogs]= useState([])

  const handleCreateBlog = (newBlog) =>{
    setBlogs((prevBlogs)=> [...prevBlogs, newBlog])
  }

const handleShowBlogs = () =>{
  setShowNews(false)
  setShowBlogs(true)
}
const handleBackToNews = () =>{
  setShowNews(true)
  setShowBlogs(false)
}

  return (
    <div className="container">
     <div className="news-blogs-app">
      {showNews && <News onShowBlogs={handleShowBlogs} blogs={blogs}/>}
      {showBlogs && <Blogs onback={handleBackToNews} onCreateBlog={handleCreateBlog}/>}
     {/* <News/> */}
     {/* <Blogs/> */}
      </div> 
    </div>
  )
}

export default App