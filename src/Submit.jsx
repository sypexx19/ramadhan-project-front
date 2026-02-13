import React, { useState } from "react";
import "./style.css";
import logo from './icon150.png';

const Submit = () => {
  const [IsOpen , setIsOpen ] = useState(false)
  const [formData, setFormData] = useState({
    user_name: "",
    family_name: "",
    gender: "",
    adress: "",
    phone_number: "",
    user_work: "",
    social_state: "",
    note: "",
  });
const initialFormData = {
  user_name: "",
  family_name: "",
  gender: "",
  adress: "",
  phone_number: "",
  user_work: "",
  social_state: "",
  note: "",
};
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
  // text + radio
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // checkbox array
  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      social_state: checked
        ? [...prev.social_state, value]
        : prev.social_state.filter((v) => v !== value),
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault(); // 🔥 لازم أول سطر

  try {
    const response = await fetch("https://wonderful-integrity-production.up.railway.app/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) {
      alert(data.message || "Submit failed ❌");
      return;
    }

    setIsOpen(true);
    setFormData(initialFormData);


  } catch (err) {
    console.error(err);
    alert("Submit failed ❌");
  }
};

  return (
     <>
    <div className="form-wrapper">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2 className="form-title">استمارة معلومات</h2>

        {/* الاسم */}
        <div className="mb-3">
          <label className="form-label">الاسم</label>
          <input
            type="text"
            className="form-control"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
          />
        </div>

        {/* اللقب */}
        <div className="mb-3">
          <label className="form-label">اللقب</label>
          <input
            type="text"
            className="form-control"
            name="family_name"
            value={formData.family_name}
            onChange={handleChange}
          />
        </div>

        {/* الجنس */}
        <div className="mb-3">
          <label className="form-label d-block">الجنس</label>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="ذكر"
              checked={formData.gender === "ذكر"}
              onChange={handleChange}
            />
            <label className="form-check-label">ذكر</label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="انثى"
              checked={formData.gender === "انثى"}
              onChange={handleChange}
            />
            <label className="form-check-label">أنثى</label>
          </div>
        </div>

        {/* العنوان */}
        <div className="mb-3">
          <label className="form-label">العنوان</label>
          <input
            type="text"
            className="form-control"
            name="adress"
            value={formData.adress}
            onChange={handleChange}
          />
        </div>

        {/* الهاتف */}
        <div className="mb-3">
          <label className="form-label">رقم الهاتف</label>
          <input
            type="tel"
            className="form-control"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>

        {/* العمل */}
        <div className="mb-3">
          <label className="form-label d-block">هل تعمل؟</label>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="user_work"
              value="نعم"
              checked={formData.user_work === "نعم"}
              onChange={handleChange}
            />
            <label className="form-check-label">نعم</label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="user_work"
              value="لا"
              checked={formData.user_work === "لا"}
              onChange={handleChange}
            />
            <label className="form-check-label">لا</label>
          </div>
        </div>

        {/* الحالة الاجتماعية */}
        <div className="mb-3">
  <label className="form-label d-block">الحالة الاجتماعية</label>

  {["عازب", "متزوج", "مطلق", "أرمل"].map((status, i) => (
    <div className="form-check form-check-inline" key={i}>
      <input
        className="form-check-input"
        type="radio"
        name="social_state"
        value={status}
        checked={formData.social_state === status}
        onChange={handleChange}
        id={`status-${i}`}
      />
      <label
        className="form-check-label"
        htmlFor={`status-${i}`}
      >
        {status}
      </label>
    </div>
  ))}
</div>
        {/*<div class="mb-3">
        <label for="user-photo" class="form-label"> شهادة اثبات </label>
        <input 
          type="file" 
          class="form-control" 
          id="user-photo" 
          accept="image/*" 
          capture="environment"
        />
        </div>*/}

        {/* رسالة */}
        <div className="mb-4">
          <label className="form-label">للتفصيل أكثر</label>
          <textarea
            className="form-control"
            rows="4"
            name="note"
            value={formData.note}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn w-100" >
          إرسال
        </button>
      </form>
        
      
    </div>
    <div>
      { IsOpen &&(
        <div className="modal-overlay">
         <div style={modalStyle}> 
          <div style={{display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column"}}>
            <img src={logo} /><br></br>
            <h3 >تم ارسال الطلب بنجاح </h3>
            <p> ستتم معالجة الطلب و تتلقون الاجابة على الهاتف </p>
          </div>

         </div>
        </div>
      )}
    </div>
   </>
  );
};

export default Submit;
