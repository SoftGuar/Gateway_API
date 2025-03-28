export const userSchemas = {
    UserTotalSchema:{
        schema: {
            description: 'Get the total number of users',
            tags: ['Users'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        total_users: { type: 'number' }
                    },
                    required: ['total_users']
                }
            }
        }
    },
    TopUsersSchema: {
        schema: {
            description: 'Get the top 10 users with the most sessions',
            tags: ['Analytics: Users'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            user_id: { type: 'number' },
                            session_count: { type: 'number' }
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
            tags: ['Analytics: Users'],
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
            tags: ['Analytics: Users'],
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
            description: 'Get the average session duration for each user',
            tags: ['Analytics: Users'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            user_id: { type: 'number' },
                            avg_session_duration_seconds: { type: 'number' }
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
            tags: ['Analytics: Users'],
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
            tags: ['Analytics: Users'],
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
            tags: ['Analytics: Users'],
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