import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User, AuthResponse } from '../shared/interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/api/auth';
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) {
        this.initializeAuthState();
    }

    private initializeAuthState() {
        const token = localStorage.getItem('token');
        if (token) {
            this.http.get<User>(`${this.apiUrl}/me`).subscribe({
                next: (user) => this.currentUserSubject.next(user),
                error: () => this.clearAuthData()
            });
        }
    }

    login(email: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
            tap(response => {
                localStorage.setItem('token', response.token);
                this.currentUserSubject.next(response.user);
            })
        );
    }

    logout(): Observable<any> {
        return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
            tap(() => {
                this.clearAuthData();
                this.router.navigate(['/login']);
            })
        );
    }

    getCurrentUser(): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/me`);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
    }
}