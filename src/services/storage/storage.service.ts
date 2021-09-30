/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { ErrorService } from '../qas/error.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private err: ErrorService) {}

  async string(options: { key: string; value: string }): Promise<void> {
    try {
      if (options.key.length === 0) {
        throw this.err.gen(['missing key'], 'failed to store string');
      }
      if (options.value.length === 0) {
        throw this.err.gen(['missing value'], 'failed to store string');
      }
      await localStorage.setItem(options.key, options.value);
      return;
    } catch (err) {
      throw err;
    }
  }

  async object(options: { key: string; value: string }): Promise<void> {
    try {
      if (options.key.length === 0) {
        throw this.err.gen(['missing key'], 'failed to store string');
      }
      if (options.value.length === 0) {
        throw this.err.gen(['missing value'], 'failed to store string');
      }
      options.value = JSON.stringify(options.value);
      await localStorage.setItem(options.key, options.value);
      return;
    } catch (err) {
      throw err;
    }
  }

  async delete(options: { key: string }): Promise<void> {
    try {
      if (options.key.length === 0) {
        throw this.err.gen(['missing key'], 'failed to delete value');
      }
      await localStorage.removeItem(options.key);
      return;
    } catch (err) {
      throw err;
    }
  }

  async get(options: {
    key: string;
    isObject?: boolean;
  }): Promise<string | null> {
    try {
      if (options.key.length === 0) {
        throw this.err.gen(['missing key'], 'failed to store string');
      }
      if (options.isObject) {
        const item = await localStorage.getItem(options.key);
        if (item !== null) {
          return JSON.parse(item);
        } else {
          return item;
        }
      } else {
        return await localStorage.getItem(options.key);
      }
    } catch (err) {
      throw err;
    }
  }
}
