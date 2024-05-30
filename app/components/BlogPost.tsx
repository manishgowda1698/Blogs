import styled from 'styled-components';

const BlogPostContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  border: 1px solid #eaeaea;
  padding: 20px;
  margin: 10px 0;
  flex-wrap: wrap;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Thumbnail = styled.img`
  width: auto;
  max-width: 200px;
  height: auto;
  object-fit: cover;
  margin-right: 20px;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const Title = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 1.5rem;
  margin: 0;
`;

const MetaData = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
  margin: 10px 0;
`;

const Author = styled.span`
  flex-grow: 1;
`;

const Date = styled.span`
  text-align: right;
`;

const Description = styled.p`
  font-size: 1rem;
  margin: 10px 0;
`;

interface BlogPostProps {
  title: string;
  date: any;
  author: string;
  description: string;
  thumbnail: any;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, date, author, description, thumbnail }) => {
  return (
    <BlogPostContainer>
      <Thumbnail src={thumbnail} alt={title} />
      <TextContent>
        <Title>{title}</Title>
        <MetaData>
          <Author>{author}</Author>
          <Date>{date}</Date>
        </MetaData>
        <Description>{description}</Description>
      </TextContent>
    </BlogPostContainer>
  );
};

export default BlogPost;
