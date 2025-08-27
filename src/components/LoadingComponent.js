// src/components/LoadingComponent.jsx
const LoadingComponent = ({ message = "กำลังโหลด..." }) => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">{message}</p>
      </div>
    </div>
  );
};

export default LoadingComponent;
