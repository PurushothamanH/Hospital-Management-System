
import styled from 'styled-components';

export const DashboardContainer = styled.div`
  padding: 20px;
`;

export const Heading = styled.h1`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
`;

export const Section = styled.section`
  margin-bottom: 40px;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

export const ItemList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const Item = styled.li`
  padding: 10px 0;
`;

export const QuoteSection = styled.div`
  text-align: center;
  margin: 20px 0;
`;

export const QuoteText = styled.p`
  font-size: 18px;
  font-style: italic;
  margin-bottom: 10px;
`;

export const ImageSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const ImageContainer = styled.div`
  width: 48%;
  img {
    width: 100%;
    height: auto;
  }
`;

export const ViewDoctorsButton = styled.button`
  display: block;
  width: 200px;
  margin: 0 auto;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  text-align: center;

  &:hover {
    background-color: #45a049;
  }
`;

export const GreetingText = styled.h2`
  font-size: 2rem;
  font-weight: 900;
  color: #333;
  position:relative;
  font-family: '32px figtree',sans-serif;
  margin: 0;
  right:650px;
  top: 50px;
  padding: 10px;
  // background-color: #f5f5f5;
  border-radius: 8px;
  // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
`;

export const HighlightedText = styled.span`
  color: #007bff;
  font-weight: 700;
`;

export const Question = styled.h2`
  font-size: 28px;
  color:rgba(var(--bs-white-rgb), var(--bs-text-opacity)) !important;
  font-weight: 800;
  font-size: 2rem;
  `;


export const RenderCard = styled.div`
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 20px;
    width: 300px;
    height: 400px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    cursor: pointer;
  
    &:hover {
      transform: translateY(-5px);
    }
  `;
  