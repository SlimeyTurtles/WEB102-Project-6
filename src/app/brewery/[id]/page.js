"use client"

import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Phone, Globe, Calendar, Building, Mail, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from 'next/link';

export default function BreweryDetail({ params }) {
  const [brewery, setBrewery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrewery = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/${params.id}`);
        if (!response.ok) throw new Error(`HTTP ERROR: ${response.status}`);
        const breweryData = await response.json();
        setBrewery(breweryData);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchBrewery();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading brewery details...</p>
        </div>
      </div>
    );
  }

  if (error || !brewery) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">
            {error ? `Error: ${error.message}` : 'Brewery not found'}
          </p>
          <Link 
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Brewery List
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-2xl">
            <CardContent className="p-8">
              <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-blue-800 mb-2">{brewery.name}</h1>
                {brewery.brewery_type && (
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {brewery.brewery_type}
                  </span>
                )}
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Contact Information
                  </h2>

                  {(brewery.street || brewery.city || brewery.state) && (
                    <motion.div 
                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <MapPin className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">Address</h3>
                        <div className="text-gray-600">
                          {brewery.street && <div>{brewery.street}</div>}
                          <div>
                            {brewery.city && brewery.city}
                            {brewery.city && brewery.state && ', '}
                            {brewery.state && brewery.state}
                            {brewery.postal_code && ` ${brewery.postal_code}`}
                          </div>
                          {brewery.country && <div>{brewery.country}</div>}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {brewery.phone && (
                    <motion.div 
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Phone className="w-6 h-6 text-green-600 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">Phone</h3>
                        <a 
                          href={`tel:${brewery.phone}`}
                          className="text-blue-600 hover:underline text-lg"
                        >
                          {brewery.phone}
                        </a>
                      </div>
                    </motion.div>
                  )}

                  {brewery.website_url && (
                    <motion.div 
                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Globe className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">Website</h3>
                        <a
                          href={brewery.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline break-all inline-flex items-center gap-1"
                        >
                          {brewery.website_url}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Additional Details
                  </h2>

                  {brewery.brewery_type && (
                    <motion.div 
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Building className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">Brewery Type</h3>
                        <span className="text-gray-600 capitalize text-lg">{brewery.brewery_type}</span>
                      </div>
                    </motion.div>
                  )}

                  {brewery.longitude && brewery.latitude && (
                    <motion.div 
                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <MapPin className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">GPS Coordinates</h3>
                        <div className="text-gray-600">
                          <div>Latitude: {brewery.latitude}</div>
                          <div>Longitude: {brewery.longitude}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {brewery.created_at && (
                    <motion.div 
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Calendar className="w-6 h-6 text-orange-600 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">Added to Database</h3>
                        <span className="text-gray-600">
                          {new Date(brewery.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {brewery.updated_at && (
                    <motion.div 
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Calendar className="w-6 h-6 text-orange-600 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">Last Updated</h3>
                        <span className="text-gray-600">
                          {new Date(brewery.updated_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-500 mb-4">
                  Share this brewery: <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                    {typeof window !== 'undefined' ? window.location.href : `brewery/${brewery.id}`}
                  </span>
                </p>
                <Link 
                  href="/"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors font-medium"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to All Breweries
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}