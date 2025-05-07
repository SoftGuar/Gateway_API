export const userSchemas = {
    UserTotalSchema: {
        schema: {
            description: 'Get the total number of users',
            tags: ['Users'],
            response: {
                200: {
                    type: 'number',
                    description: 'Total number of users'
                }
            }
        }
    },
    TopUsersSchema: {
        schema: {
            description: 'Get the top 10 users with the most sessions and their names',
            tags: ['Users'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            user_id: { type: 'number' },
                            session_count: { type: 'number' },
                            name: { type: 'string', nullable: true }
                        },
                        required: ['user_id', 'session_count']
                    }
                }
            }
        }
    },
    UserRatingsSchema: {
        schema: {
            description: 'Get the overall average user rating',
            tags: ['Users'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        overall_avg_rating: { type: 'number' }
                    },
                    required: ['overall_avg_rating']
                }
            }
        }
    },
    UserFeedbackSchema: {
        schema: {
            description: 'Get all user feedback',
            tags: ['Users'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            user_id: { type: 'number' },
                            rating: { type: 'number' },
                            created_at: { type: 'string', format: 'date-time' }
                        },
                        required: ['id', 'user_id', 'rating', 'created_at']
                    }
                }
            }
        }
    },
    UserSessionDurationSchema: {
        schema: {
            description: 'Get the average session duration for each user with their names',
            tags: ['Users'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            user_id: { type: 'number' },
                            avg_session_duration_seconds: { type: 'number' },
                            name: { type: 'string', nullable: true }
                        },
                        required: ['user_id', 'avg_session_duration_seconds']
                    }
                }
            }
        }
    },
    DAUsSchema: {
        schema: {
            description: 'Get the daily active users (DAUs)',
            tags: ['Users'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            date: { type: 'string', format: 'date' },
                            dau_count: { type: 'number' }
                        },
                        required: ['date', 'dau_count']
                    }
                }
            }
        }
    },
    MAUsSchema: {
        schema: {
            description: 'Get the monthly active users (MAUs)',
            tags: ['Users'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            date: { type: 'string', format: 'date' },
                            mau_count: { type: 'number' }
                        },
                        required: ['date', 'mau_count']
                    }
                }
            }
        }
    },
    WAUsSchema: {
        schema: {
            description: 'Get the weekly active users (WAUs)',
            tags: ['Users'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            date: { type: 'string', format: 'date' },
                            wau_count: { type: 'number' }
                        },
                        required: ['date', 'wau_count']
                    }
                }
            }
        }
    }
};
