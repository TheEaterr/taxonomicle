/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Rank = "rank",
	Report = "report",
	Taxon = "taxon",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type RankRecord = {
	name: string
	order: number
}

export type ReportRecord = {
	description: string
	taxon: RecordIdString
}

export enum TaxonIucnOptions {
	"EX" = "EX",
	"EW" = "EW",
	"CR" = "CR",
	"EN" = "EN",
	"VU" = "VU",
	"NT" = "NT",
	"LC" = "LC",
	"DD" = "DD",
}
export type TaxonRecord<Tpath = unknown> = {
	description?: string
	image_link?: string
	image_path?: boolean
	iucn?: TaxonIucnOptions
	parent?: RecordIdString
	path?: null | Tpath
	rank: RecordIdString
	scientific: string
	site_link: string
	vernacular?: string
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type RankResponse<Texpand = unknown> = Required<RankRecord> & BaseSystemFields<Texpand>
export type ReportResponse<Texpand = unknown> = Required<ReportRecord> & BaseSystemFields<Texpand>
export type TaxonResponse<Tpath = unknown, Texpand = unknown> = Required<TaxonRecord<Tpath>> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	rank: RankRecord
	report: ReportRecord
	taxon: TaxonRecord
	users: UsersRecord
}

export type CollectionResponses = {
	rank: RankResponse
	report: ReportResponse
	taxon: TaxonResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'rank'): RecordService<RankResponse>
	collection(idOrName: 'report'): RecordService<ReportResponse>
	collection(idOrName: 'taxon'): RecordService<TaxonResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
