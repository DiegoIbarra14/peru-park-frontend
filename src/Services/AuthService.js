import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../config/firebase/firebaseinstance";

class AuthService {
    async login(data) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.username, data.password);
            return userCredential.user;
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            throw error;
        }
    }
}
export const loginService = new AuthService()