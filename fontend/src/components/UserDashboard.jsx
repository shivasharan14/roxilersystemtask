import React, { useState } from 'react';
import { submitRating } from '../services/api';
import { toast } from 'react-toastify';

const UserDashboard = ({ stores }) => {
    const [selectedStore, setSelectedStore] = useState(null);
    const [rating, setRating] = useState({ score: 5, comment: "" });

    const handleRateSubmit = async () => {
        try {
            await submitRating({
                storeId: selectedStore.id,
                score: Number(rating.score),
                comment: rating.comment
            });
            toast.success("Rating submitted successfully! 🎉");
            setSelectedStore(null); // Close the modal
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit rating!");
        }
    };

    return (
        <div className="container mt-4">
            <h3>Available Stores to Rate</h3>
            <div className="row mt-4">
                {Array.isArray(stores) && stores.map((s) => (
                    <div key={s.id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body">
                                <h5 className="card-title text-dark">{s.name}</h5>
                                <p className="card-text text-muted">{s.address || "Address not provided"}</p>
                                {/* Button to open rating modal */}
                                <button 
                                    className="btn btn-outline-primary w-100"
                                    onClick={() => setSelectedStore(s)}
                                >
                                    Rate This Store
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Rating Modal */}
            {selectedStore && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content p-4">
                            <h4>Rate {selectedStore.name}</h4>
                            <label>Score (1-5)</label>
                            <input 
                                type="number" min="1" max="5" 
                                className="form-control my-2" 
                                value={rating.score} 
                                onChange={(e) => setRating({...rating, score: e.target.value})} 
                            />
                            <textarea 
                                className="form-control" 
                                placeholder="Write a comment..." 
                                value={rating.comment}
                                onChange={(e) => setRating({...rating, comment: e.target.value})} 
                            />
                            <div className="mt-3 text-end">
                                <button className="btn btn-secondary me-2" onClick={() => setSelectedStore(null)}>Cancel</button>
                                <button className="btn btn-success" onClick={handleRateSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default UserDashboard;