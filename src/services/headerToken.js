export const setHeaders = () => {
    const token = localStorage.getItem('token');
  
    return {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    };
  };
  