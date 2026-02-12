import React, { useState, useEffect } from 'react';
import "./style.css";

const Show = () => {
  const [users, setUsers] = useState([]);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const modalStyle = {
  direction: 'rtl',
  position: 'relative',
  backgroundColor: '#ffffff',
  padding: '30px',
  borderRadius: '12px',
  width: '500px',
  maxWidth: '90%',
  boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
  zIndex: 1000,
};

 useEffect(() => {
  fetch('http://localhost:5000/api/users')
    .then(res => res.json())
    .then(data => {
      console.log('API RESPONSE:', data);

      if (data.success && Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        setUsers([]);
        console.error('Unexpected API response:', data);
      }
    })
    .catch(err => console.error('FETCH ERROR:', err));
}, []);
const handleDelete = async (id) => {
  try {
    await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "DELETE",
    });

    // Remove user from state after delete
    setUsers(prev =>
  prev.filter(user => user.user_id !== id)
);
  } catch (error) {
    console.log("Delete error:", error);
  }
};



  return (
    <>
    <div className="card-container">
      {users.length === 0 && <p className='user-card'>لا يوجد مستخدمون</p>}

      {users.map(user => (
        <div key={user.user_id} className="user-card">
          <h3>{user.family_name}</h3>
          <p>{user.user_name}</p>

          <button
            onClick={() => {
              setSelectedUser(user);
              setIsDetailsModalOpen(true);
            }}
          >
            تفاصيل
          </button>
        </div>
      ))}
    </div>
    {isDetailsModalOpen && selectedUser && (
        <div className="modal-overlay" onClick={() => setIsDetailsModalOpen(false)}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        <button className="close-btn"onClick={() => setIsDetailsModalOpen(false)}>×</button>

        <h2> تفاصيل المسجل </h2><br></br>
        <p><strong>الاسم:</strong> {selectedUser.user_name}</p>
        <p><strong>اللقب:</strong> {selectedUser.family_name}</p>
        <p><strong>الجنس:</strong> {selectedUser.gender}</p>
        <p><strong>الهاتف:</strong> {selectedUser.phone_number}</p>
        <p><strong>العنوان:</strong> {selectedUser.adress}</p>
        <p><strong>العمل:</strong> {selectedUser.user_work}</p>
        <p><strong>الحالة الاجتماعية:</strong> {selectedUser.social_state}</p>
        <p><strong>ملاحظة:</strong> {selectedUser.note}</p>
        <button onClick={ () => handleDelete(selectedUser.user_id) } className='cancel'> حذف </button>
      </div>
    </div>

      )}
    </>

  );
};

export default Show;
