// ChangePasswordModal.js
import React, { useState } from 'react';
import { toast } from "react-toastify";
import "../Styles/PasswordStyle.css";

const ChangePasswordModal = ({ isOpen, onClose, onConfirm, user }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    if (!isOpen) return null;

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("Les mots de passe ne correspondent pas.");
            return;
        }

        onConfirm(newPassword);
        onClose();
    };


    return (
        <div className='container-password-change'>
            <div className="confirmation-card">
                <h4>Changer votre mot de passe</h4>
                <input
                    type="password"
                    placeholder="Nouveau mot de passe"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirmez le nouveau mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className='confirmation-buttons'>
                    <button onClick={(e) => {
                        e.preventDefault();
                        handleChangePassword();
                    }}>Changer le mot de passe</button>
                    <button onClick={onClose}>Fermer</button>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
