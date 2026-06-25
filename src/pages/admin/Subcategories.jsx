import { useEffect, useState } from 'react';

import { apiFetch } from '../../utils/api';

export default function Subcategories() {
 const [subcategories, setSubcategories] = useState([]);

 
  const loadSubcategories = async () => {
    try {
      console.log('Loading subcategories...');
      const data = await apiFetch('/api/subcategories');
     console.log(JSON.stringify(data, null, 2));
      setSubcategories(data);
    } catch (error) {
      console.error(error);
    }
  };
 useEffect(() => {
    loadSubcategories();
  }, []);
console.log('Component Loaded');
console.log(subcategories);
  return (
    <div>
      <h2>Subcategories</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category ID</th>
            <th>Title</th>
          </tr>
        </thead>

        <tbody>
          {subcategories.map((sub) => (
            <tr key={sub.id}>
              <td>{sub.id}</td>
             <td>{sub.category_id}</td>
              <td>{sub.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}