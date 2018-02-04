export interface GithubApi {
    items: GithubIssue[];
    total_count: number;
}

export interface GithubIssue {
    created_at: string;
    number: string;
    state: string;
    title: string;
}

export interface Issue {
    title?: string;
    body?: string;
    assignee?: string;
    milestone?: number;
    labels?: Array<string>;
    assignees?: Array<string>;
}