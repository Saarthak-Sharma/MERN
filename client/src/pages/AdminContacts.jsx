import { useState, useEffect } from "react";
import { useAuth } from "../store/Auth";
import "./AdminContacts.css";

export const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const { authorizationToken } = useAuth();

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/contacts", {
        headers: { Authorization: authorizationToken },
      });
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const deleteContact = async (id) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;
    
    try {
      await fetch(`http://localhost:5000/api/admin/contacts/${id}`, {
        method: "DELETE",
        headers: { Authorization: authorizationToken },
      });
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="admin-contacts">
      <h1>Manage Contacts</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>{contact.username}</td>
              <td>{contact.email}</td>
              <td>{contact.message}</td>
              <td>
                <button className="btn-delete" onClick={() => deleteContact(contact._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
