import React, { useState } from 'react';
import { User } from '../../types';
import Icon from '../common/Icon';

interface AuthViewProps {
  onLogin: (user: Partial<User>) => void;
  onRegister: (user: Partial<User>) => void;
  onClose: () => void;
}

type AuthMode = 'login' | 'register' | 'forgotPassword' | 'resetPassword';

const AuthView: React.FC<AuthViewProps> = ({ onLogin, onRegister, onClose }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const validate = () => {
    if (mode === 'register' || mode === 'login') {
        if(username.length < 5 || username.length > 30) {
            setError("Tên người dùng phải từ 5 đến 30 ký tự.");
            return false;
        }
        if(!/^[a-zA-Z0-9_]+$/.test(username)) {
            setError("Tên người dùng chỉ được chứa chữ cái, số và dấu gạch dưới (_).");
            return false;
        }
    }

    if (mode === 'register' || mode === 'login' || mode === 'resetPassword') {
        if (password.length < 6 || password.length > 20) {
            setError("Mật khẩu phải từ 6 đến 20 ký tự.");
            return false;
        }
        if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
            setError("Mật khẩu phải chứa ít nhất một chữ cái và một chữ số.");
            return false;
        }
    }

    if ((mode === 'register' || mode === 'resetPassword') && password !== confirmPassword) {
        setError("Mật khẩu không khớp.");
        return false;
    }
    setError('');
    return true;
  }

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    if (mode === 'register') {
        onRegister({ username });
    } else {
        onLogin({ username });
    }
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryEmail.trim()) {
        setError('Vui lòng nhập tên người dùng hoặc email của bạn.');
        return;
    }
    // Simulate sending email.
    alert(`Một mã khôi phục đã được gửi đến tài khoản '${recoveryEmail}'. (Mã giả lập là: 123456)`);
    setMode('resetPassword');
    setError('');
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (recoveryCode !== '123456') {
        setError('Mã khôi phục không hợp lệ.');
        return;
    }
    if (!validate()) return;
    
    // Simulate password reset
    alert('Mật khẩu đã được đặt lại thành công. Vui lòng đăng nhập với mật khẩu mới.');
    setMode('login');
    setUsername(recoveryEmail); // Pre-fill username for convenience
    setRecoveryEmail('');
    setRecoveryCode('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  const renderTitle = () => {
    switch (mode) {
      case 'login': return { title: 'Chào mừng trở lại', subtitle: 'Đăng nhập để tiếp tục cuộc phiêu lưu của bạn.' };
      case 'register': return { title: 'Tạo tài khoản', subtitle: 'Tham gia cộng đồng độc giả và tác giả của chúng tôi.' };
      case 'forgotPassword': return { title: 'Khôi phục mật khẩu', subtitle: 'Nhập tên người dùng hoặc email để nhận mã khôi phục.' };
      case 'resetPassword': return { title: 'Đặt lại mật khẩu', subtitle: 'Nhập mã khôi phục và mật khẩu mới của bạn.' };
      default: return { title: '', subtitle: ''};
    }
  };
  
  const renderForm = () => {
    switch(mode) {
      case 'login':
      case 'register':
        return (
          <>
            <input type="text" placeholder="Tên người dùng" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full bg-background border border-slate-300 rounded-lg p-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" />
            <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-background border border-slate-300 rounded-lg p-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" />
            {mode === 'register' && <input type="password" placeholder="Xác nhận mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full bg-background border border-slate-300 rounded-lg p-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" />}
          </>
        );
      case 'forgotPassword':
        return <input type="text" placeholder="Tên người dùng hoặc Email" value={recoveryEmail} onChange={(e) => setRecoveryEmail(e.target.value)} required className="w-full bg-background border border-slate-300 rounded-lg p-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" />;
      case 'resetPassword':
        return (
            <>
                <input type="text" placeholder="Mã khôi phục" value={recoveryCode} onChange={(e) => setRecoveryCode(e.target.value)} required className="w-full bg-background border border-slate-300 rounded-lg p-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="password" placeholder="Mật khẩu mới" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-background border border-slate-300 rounded-lg p-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="password" placeholder="Xác nhận mật khẩu mới" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full bg-background border border-slate-300 rounded-lg p-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" />
            </>
        );
      default:
        return null;
    }
  };

  const renderActions = () => {
      let submitHandler = handleAuthSubmit;
      let submitText = mode === 'login' ? 'Đăng nhập' : 'Đăng ký';
      if (mode === 'forgotPassword') {
          submitHandler = handleForgotPasswordSubmit;
          submitText = 'Gửi yêu cầu';
      } else if (mode === 'resetPassword') {
          submitHandler = handleResetPasswordSubmit;
          submitText = 'Đặt lại mật khẩu';
      }
      
      return (
        <form onSubmit={submitHandler} className="space-y-4">
            {renderForm()}
            {mode === 'login' && (
                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-text-secondary cursor-pointer">
                        <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="form-checkbox h-4 w-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary" />
                        Ghi nhớ đăng nhập
                    </label>
                    <button type="button" onClick={() => setMode('forgotPassword')} className="font-medium text-accent hover:underline">Quên mật khẩu?</button>
                </div>
            )}
            {error && <p className="text-red-500 text-sm animate-fade-in">{error}</p>}
            <button type="submit" className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded-lg transition-colors">{submitText}</button>
        </form>
      );
  }

  const renderFooter = () => {
      if (mode === 'login') return <button onClick={() => { setMode('register'); setError(''); }} className="text-accent hover:underline text-sm">Chưa có tài khoản? Đăng ký</button>;
      if (mode === 'register') return <button onClick={() => { setMode('login'); setError(''); }} className="text-accent hover:underline text-sm">Đã có tài khoản? Đăng nhập</button>;
      if (mode === 'forgotPassword' || mode === 'resetPassword') return <button onClick={() => { setMode('login'); setError(''); }} className="text-accent hover:underline text-sm">Quay lại Đăng nhập</button>;
      return null;
  }

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="bg-surface rounded-lg shadow-2xl p-8 w-full max-w-md relative animate-fade-in-up border border-border-color">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-text-primary transition-colors">
          <Icon name="close" className="w-6 h-6" />
        </button>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-text-primary">{renderTitle().title}</h2>
          <p className="text-text-secondary mt-2">{renderTitle().subtitle}</p>
        </div>
        
        {renderActions()}

        {(mode === 'login' || mode === 'register') && (
            <>
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border-color" /></div>
                    <div className="relative flex justify-center text-sm"><span className="bg-surface px-2 text-text-secondary">Hoặc tiếp tục với</span></div>
                </div>
                 <div className="flex gap-4">
                    <button className="flex-1 bg-white border border-border-color text-text-primary font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.804 12.16C34.553 8.246 29.692 6 24 6C12.955 6 4 14.955 4 26s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.842-5.842C34.553 8.246 29.692 6 24 6C16.318 6 9.656 10.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 46c5.692 0 10.553-2.246 14.804-6.16l-5.842-5.842C30.842 35.846 27.059 38 24 38c-5.864 0-10.991-3.956-12.724-9.282l-6.571 4.819C9.656 41.663 16.318 46 24 46z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.16-4.082 5.571l5.842 5.842C42.22 35.295 44 30.865 44 26c0-1.341-.138-2.65-.389-3.917z"></path></svg>
                        Google
                    </button>
                    <button className="flex-1 bg-[#1877F2] text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#166e_e1] transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"></path></svg>
                        Facebook
                    </button>
                </div>
            </>
        )}

        <div className="mt-6 text-center">
          {renderFooter()}
        </div>
      </div>
    </div>
  );
};

export default AuthView;
