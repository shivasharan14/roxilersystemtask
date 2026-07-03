import React from 'react';

const OwnerDashboard = ({ stats }) => {
    // stats मध्ये { storeName, averageScore, totalRatings, ratings } हा डेटा येतोय
    return (
        <div className="container mt-4">
            <div className="card shadow p-4 mb-4">
                <h3 className="text-primary">{stats?.storeName || "My Store"}</h3>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <p>Average Rating: <strong>{stats?.averageScore || 0} / 5</strong></p>
                    </div>
                    <div className="col-md-6">
                        <p>Total Ratings: <strong>{stats?.totalRatings || 0}</strong></p>
                    </div>
                </div>
            </div>

            <div className="card p-4 shadow">
                <h4>Customer Reviews</h4>
                <table className="table table-hover mt-3">
                    <thead className="table-light">
                        <tr><th>Customer</th><th>Comment</th><th>Score</th></tr>
                    </thead>
                    <tbody>
                        {stats?.ratings?.length > 0 ? (
                            stats.ratings.map((r, i) => (
                                <tr key={i}>
                                    <td>{r.User?.name || "Anonymous"}</td>
                                    <td>{r.comment || "-"}</td>
                                    <td><span className="badge bg-success">{r.score}</span></td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="3" className="text-center">No reviews yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default OwnerDashboard;