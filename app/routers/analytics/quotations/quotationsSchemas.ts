export const quotationsSchemas = {
    countConvertedQuotations: {
        tags: ['Analytics : Quotations'],
        description: "Get the total count of converted quotations and conversion rate",
        response: {
            200: {
                type: "object",
                properties: {
                    ConvertedQuotations: { type: "number" },
                    taux_conversion: { type: "number" }
                }
            }
        }
    },
    averageTimeToConversion: {
        tags: ['Analytics : Quotations'],
        description: "Get the average time taken to convert quotations",
        response: {
            200: {
                type: "object",
                properties: {
                    averageTimeToConversion: { type: "number", nullable: true }
                }
            }
        }
    },
    mostFrequentlyQuotedProducts: {
        tags: ['Analytics : Quotations'],
        description: "Get the most frequently quoted products",
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        product_id: { type: "number" },
                        product_name: { type: "string" },   
                        count: { type: "number" }
                    }
                }
            }
        }
    },
    productConversionRate: {
        tags: ['Analytics : Quotations'],
        description: "Get the conversion rate for each product",
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        product_name: { type: "string" },
                        conversion_rate: { type: "number" }
                    }
                }
            }
        }
    },
    totalQuotationValueByProduct: {
        tags: ['Analytics : Quotations'],
        description: "Get the total quotation value grouped by product",
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        product_name: { type: "string" },
                        total_value: { type: "number" }
                    }
                }
            }
        }
    },
    clientsWithMostUnconvertedQuotations: {
        tags: ['Analytics : Quotations'],
        description: "Get the clients with the most unconverted quotations",
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        user_last_name: { type: "string" },
                        user_first_name: { type: "string" },
                        unconverted_count: { type: "number" }
                    }
                }
            }
        }
    },
    totalQuotationsCreated: {
        tags: ['Analytics : Quotations'],
        description: "Get the total number of quotations created",
        response: {
            200: {
                type: "object",
                properties: {
                    totalQuotationsCreated: { type: "number" }
                }
            }
        }
    },
    averageProductsPerQuotation: {
        tags: ['Analytics : Quotations'],
        description: "Get the average number of products per quotation",
        response: {
            200: {
                type: "object",
                properties: {
                    averageProductsPerQuotation: { type: "number", nullable: true }
                }
            }
        }
    },
    averageQuotationValue: {
        tags: ['Analytics : Quotations'],
        description: "Get the average value of quotations",
        response: {
            200: {
                type: "object",
                properties: {
                    averageQuotationValue: { type: "number", nullable: true }
                }
            }
        }
    }
};