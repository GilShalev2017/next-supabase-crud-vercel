import styled from 'styled-components';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const HeaderContainer = styled.header<{ theme: 'light' | 'dark' }>`
  background-color: ${props => props.theme === 'light' ? '#ffffff' : '#2d2d2d'};
  padding: 1rem 2rem;
  border-bottom: 1px solid ${props => props.theme === 'light' ? '#e0e0e0' : '#404040'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1<{ theme: 'light' | 'dark' }>`
  color: ${props => props.theme === 'light' ? '#212529' : '#e0e0e0'};
  font-size: 1.5rem;
  font-weight: 600;
`;

const ThemeToggle = styled.button<{ theme: 'light' | 'dark' }>`
  background-color: ${props => props.theme === 'light' ? '#f8f9fa' : '#404040'};
  color: ${props => props.theme === 'light' ? '#212529' : '#e0e0e0'};
  border: 1px solid ${props => props.theme === 'light' ? '#dee2e6' : '#555'};
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme === 'light' ? '#e9ecef' : '#555'};
  }
`;

export default function Header({ theme, toggleTheme }: HeaderProps) {
  return (
    <HeaderContainer theme={theme}>
      <Title theme={theme}>Next Supabase CRUD Demo</Title>
      <ThemeToggle theme={theme} onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </ThemeToggle>
    </HeaderContainer>
  );
}
