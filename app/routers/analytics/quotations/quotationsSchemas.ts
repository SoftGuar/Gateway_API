export const quotationsSchemas = {
    countConvertedQuotations: {
        description: "Get the total count of converted quotations and conversion rate",
        tags: ['Analytics: Quotations'],
        summary: "Get converted quotations count and conversion rate",
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
        description: "Get the average time taken to convert quotations",
        tags: ['Analytics: Quotations'],
        summary: "Get average time to conversion",
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
        description: "Get the most frequently quoted products",
        tags: ['Analytics: Quotations'],
        summary: "Get most frequently quoted products",
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        product_id: { type: "number" },
                        count: { type: "number" }
                    }
                }
            }
        }
    },
    productConversionRate: {
        description: "Get the conversion rate for each product",
        tags: ['Analytics: Quotations'],
        summary: "Get product conversion rate",
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        product_id: { type: "number" },
                        conversion_rate: { type: "number" }
                    }
                }
            }
        }
    },
    totalQuotationValueByProduct: {
        description: "Get the total quotation value grouped by product",
        tags: ['Analytics: Quotations'],
        summary: "Get total quotation value by product",
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        product_id: { type: "number" },
                        total_value: { type: "number" }
                    }
                }
            }
        }
    },
    clientsWithMostUnconvertedQuotations: {
        description: "Get the clients with the most unconverted quotations",
        tags: ['Analytics: Quotations'],
        summary: "Get clients with most unconverted quotations",
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        user_id: { type: "number" },
                        unconverted_count: { type: "number" }
                    }
                }
            }
        }
    },
    totalQuotationsCreated: {
        description: "Get the total number of quotations created",
        tags: ['Analytics: Quotations'],
        summary: "Get total quotations created",
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
        description: "Get the average number of products per quotation",
        tags: ['Analytics: Quotations'],
        summary: "Get average products per quotation",
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
        description: "Get the average value of quotations",
        tags: ['Analytics: Quotations'],
        summary: "Get average quotation value",
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