import { Config } from '../../services.config';
import { appEmitter } from '../notifications/event';

import { UserType, UserWithHelpersType,HelperType } from './types';

export interface CreateUserData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  MAC: string;
  phone?: string;
}

export class UserService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = Config.getInstance().getUserManagementIP();
  }

  // POST /users
  async createUser(userData: CreateUserData): Promise<UserType> {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    // send notification
    appEmitter.emit("user.created",{
      type: 'User',
      email: userData.email,
      name: userData.first_name + ' ' + userData.last_name
    });
    // return the created user data
    const payload = await response.json();
    return payload.data;
  }

  // GET /users
  async getUsers(): Promise<UserWithHelpersType[]> {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const payload = await response.json();
    return payload.data;
  }

  // GET /users/:id
  async getUserById(id: string): Promise<UserWithHelpersType> {
    const response = await fetch(`${this.baseUrl}/users/${id}`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    const payload = await response.json();
    return payload.data;
  }

  // PUT /users/:id
  async updateUser(id: string, updateData: Partial<CreateUserData>): Promise<UserType> {
    const response = await fetch(`${this.baseUrl}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    // send notification
    appEmitter.emit("user.updated",{
      type: 'User',
      id: id,
    });
    const payload = await response.json();
    return payload.data;
  }

  // DELETE /users/:id
  async deleteUser(id: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/users/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    return await response.json();
  }

  // GET /users/:id/helpers
  async getUserHelpers(id: string): Promise<HelperType[]> {
    const response = await fetch(`${this.baseUrl}/users/${id}/helpers`, {
      method: 'GET'
    });
    if (!response.ok) {
      throw new Error('Failed to get user helpers');
    }
    const payload = await response.json();
    return payload.data;
  }

  // POST /users/:id/helpers/:helperId
  async addHelperToUser(id: string, helperId: string): Promise<UserWithHelpersType> {
    const response = await fetch(`${this.baseUrl}/users/${id}/helpers/${helperId}`, {
      method: 'POST'
    });
    if (!response.ok) {
      throw new Error('Failed to add helper to user');
    }
    // send notification
    appEmitter.emit("user.helper.added",{
      user:{
        id: id,
        type: "'USER'"
      },
      helper: {
        id: helperId,
        type: 'HELPER'
      }
    });
    const payload = await response.json();
    return payload.data;
  }

  // DELETE /users/:id/helpers/:helperId
  async removeHelperFromUser(id: string, helperId: string): Promise<UserWithHelpersType> {
    const response = await fetch(`${this.baseUrl}/users/${id}/helpers/${helperId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to remove helper from user');
    }
    const payload = await response.json();
    return payload.data;
  }
}
