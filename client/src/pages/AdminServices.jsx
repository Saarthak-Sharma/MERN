import { useState, useEffect } from "react";
import { useAuth } from "../store/Auth";
import "./AdminServices.css";

export const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    service: "",
    description: "",
    price: "",
    provider: "",
    isFree: false,
  });
  const { authorizationToken } = useAuth();

  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/services", {
        headers: { Authorization: authorizationToken },
      });
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingService
      ? `http://localhost:5000/api/admin/services/${editingService._id}`
      : "http://localhost:5000/api/admin/services";
    const method = editingService ? "PATCH" : "POST";

    try {
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(formData),
      });
      fetchServices();
      resetForm();
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const deleteService = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      await fetch(`http://localhost:5000/api/admin/services/${id}`, {
        method: "DELETE",
        headers: { Authorization: authorizationToken },
      });
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const editService = (service) => {
    setEditingService(service);
    setFormData(service);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      service: "",
      description: "",
      price: "",
      provider: "",
      isFree: false,
    });
    setEditingService(null);
    setShowForm(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="admin-services">
      <div className="header">
        <h1>Manage Services</h1>
        <button className="btn-add" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add Service"}
        </button>
      </div>

      {showForm && (
        <form className="service-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Service Name"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Provider"
            value={formData.provider}
            onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
            required
          />
          <label>
            <input
              type="checkbox"
              checked={formData.isFree}
              onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
            />
            Free Service
          </label>
          <button type="submit" className="btn-submit">
            {editingService ? "Update" : "Create"} Service
          </button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Description</th>
            <th>Price</th>
            <th>Provider</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id}>
              <td>{service.service}</td>
              <td>{service.description}</td>
              <td>{service.price}</td>
              <td>{service.provider}</td>
              <td>{service.isFree ? "Free" : "Paid"}</td>
              <td>
                <button className="btn-edit" onClick={() => editService(service)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => deleteService(service._id)}>
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
