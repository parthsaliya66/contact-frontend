import { useEffect, useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API;



function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get(`${API}/`).then(res => setContacts(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${API}/post`, { name, email });
    setContacts([...contacts, res.data]);
    setName('');
    setEmail('');
  };

  return (
    <div className="p-4">
      <h1>Contact Manager</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {contacts.map(c => (
          <li key={c._id}>{c.name} - {c.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
