"use client";

import React, { useState, useEffect } from 'react';
import BlogPost from './components/BlogPost';
import styled, { ThemeProvider, css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faSun, faMoon, faBars } from '@fortawesome/free-solid-svg-icons';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  description: string;
  thumbnail: string;
}

interface HeaderProps {
  isMenuOpen: boolean;
}

const Container = styled.div`
  padding: 20px;
`;

const BlogContainer = styled.div`
  display: grid;
  grid-template-columns: 1fx;
  gap: 20px;
  padding: 20px;
`;

const Header = styled.header<HeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};

  nav {
    display: flex;
    align-items: center;

    a {
      margin-right: 20px;
      font-size: 18px;
      text-decoration: none;
      color: inherit;
      transition: color 0.3s;

      &:hover {
        color: #007bff;
      }
    }

    @media screen and (max-width: 768px) {
      display: ${props => (props.isMenuOpen ? 'block' : 'none')};
      position: absolute;
      top: 60px;
      right: 20px;
      background-color: ${props => props.theme.background};
      border: 1px solid ${props => props.theme.text};
      border-radius: 5px;
      padding: 10px;

      a {
        display: block;
        margin: 10px 0;
      }
    }
  }

  .nav-toggle-container {
    display: flex;
    align-items: center;
  }

  .toggle-button {
    margin-left: auto;
  }

  .menu-button {
    display: none;

    @media screen and (max-width: 768px) {
      display: block;
      background-color: transparent;
      border: none;
      cursor: pointer;
      color: ${props => props.theme.text};
      font-size: 24px;
    }
  }
`;

const Footer = styled.footer`
  padding: 20px;
  text-align: center;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};

  .social-icons {
    margin-top: 10px;

    .icon {
      margin: 0 10px;
      font-size: 24px;
      color: ${props => props.theme.text};
      cursor: pointer;
    }
  }
`;

const SearchBar = styled.input`
  padding: 10px;
  width: 100%;
  max-width: 400px;
  margin: 20px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
  }

  @media screen and (max-width: 768px) {
    width: calc(100% - 40px);
  }
`;

const ToggleButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.text};
`;

const lightTheme = {
  background: '#ffffff',
  text: '#000000',
};

const darkTheme = {
  background: '#000000',
  text: '#ffffff',
};

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [theme, setTheme] = useState(lightTheme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('/blog.json');
      const data = await res.json();
      setBlogPosts(data);
      console.log(data);
    };
    
    fetchBlogs();
  }, []);

  const handleToggle = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <Header isMenuOpen={isMenuOpen}>
        <h1>My Blog</h1>
        <div className="nav-toggle-container">
          <nav>
            <a href="/">Blog</a>
            <a href="/works">Works</a>
            <a href="/contacts">Contacts</a>
          </nav>
          <ToggleButton onClick={handleToggle}>
            <FontAwesomeIcon icon={theme === lightTheme ? faMoon : faSun} />
          </ToggleButton>
          <button className="menu-button" onClick={handleMenuToggle}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </Header>
      <main style={{ backgroundColor: theme.background, color: theme.text }}>
        <Container>
          <SearchBar
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <BlogContainer>
            {filteredPosts.map(post => (
              <BlogPost key={post.id} {...post} />
            ))}
          </BlogContainer>
        </Container>
      </main>
      <Footer>
        <p>Follow us on social media</p>
        <div className="social-icons">
          <FontAwesomeIcon icon={faTwitter} className="icon" />
          <FontAwesomeIcon icon={faFacebook} className="icon" />
          <FontAwesomeIcon icon={faInstagram} className="icon" />
        </div>
        <p>@copyrights 2024</p>
      </Footer>
    </ThemeProvider>
  );
};

export default HomePage;
