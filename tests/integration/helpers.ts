import { agent as _request } from "supertest"
import {get as getApplication} from '../../server'

export const request = _request(getApplication());